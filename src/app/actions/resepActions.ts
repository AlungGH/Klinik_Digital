"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createResep(formData: FormData) {
  const pasienId = formData.get("pasienId") as string;
  const diagnosa = formData.get("diagnosa") as string;
  const catatan = formData.get("catatan") as string;
  const tanggal = formData.get("tanggal") as string;

  // Parse obat items
  const obatIds = formData.getAll("obatId") as string[];
  const jumlahList = formData.getAll("jumlah") as string[];
  const aturanList = formData.getAll("aturanPakai") as string[];

  const resep = await prisma.resep.create({
    data: {
      pasienId,
      diagnosa,
      catatan: catatan || null,
      tanggal: tanggal ? new Date(tanggal) : new Date(),
      resepDetail: {
        create: obatIds.map((obatId, i) => ({
          obatId,
          jumlah: parseInt(jumlahList[i], 10),
          aturanPakai: aturanList[i],
        })),
      },
    },
  });

  // Kurangi stok obat
  for (let i = 0; i < obatIds.length; i++) {
    await prisma.obat.update({
      where: { id: obatIds[i] },
      data: { stok: { decrement: parseInt(jumlahList[i], 10) } },
    });
  }

  revalidatePath("/resep");
  revalidatePath("/dashboard");
  redirect(`/resep/${resep.id}`);
}

export async function deleteResep(id: string) {
  await prisma.resep.delete({ where: { id } });
  revalidatePath("/resep");
  redirect("/resep");
}
