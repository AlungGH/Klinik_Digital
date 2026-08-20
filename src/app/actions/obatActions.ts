"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createObat(formData: FormData) {
  const namaObat = formData.get("namaObat") as string;
  const satuan = formData.get("satuan") as string;
  const stok = parseInt(formData.get("stok") as string, 10);
  const keterangan = formData.get("keterangan") as string;

  await prisma.obat.create({
    data: { namaObat, satuan, stok, keterangan: keterangan || null },
  });

  revalidatePath("/obat");
  redirect("/obat");
}

export async function updateObat(id: string, formData: FormData) {
  const namaObat = formData.get("namaObat") as string;
  const satuan = formData.get("satuan") as string;
  const stok = parseInt(formData.get("stok") as string, 10);
  const keterangan = formData.get("keterangan") as string;

  await prisma.obat.update({
    where: { id },
    data: { namaObat, satuan, stok, keterangan: keterangan || null },
  });

  revalidatePath("/obat");
  redirect("/obat");
}

export async function deleteObat(id: string) {
  await prisma.obat.delete({ where: { id } });
  revalidatePath("/obat");
}
