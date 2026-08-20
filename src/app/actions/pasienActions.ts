"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPasien(formData: FormData) {
  const nama = formData.get("nama") as string;
  const noRm = formData.get("noRm") as string;
  const tanggalLahir = formData.get("tanggalLahir") as string;
  const jenisKelamin = formData.get("jenisKelamin") as "LAKI_LAKI" | "PEREMPUAN";
  const alamat = formData.get("alamat") as string;
  const noTelepon = formData.get("noTelepon") as string;

  await prisma.pasien.create({
    data: {
      nama,
      noRm,
      tanggalLahir: new Date(tanggalLahir),
      jenisKelamin,
      alamat,
      noTelepon,
    },
  });

  revalidatePath("/pasien");
  redirect("/pasien");
}

export async function updatePasien(id: string, formData: FormData) {
  const nama = formData.get("nama") as string;
  const tanggalLahir = formData.get("tanggalLahir") as string;
  const jenisKelamin = formData.get("jenisKelamin") as "LAKI_LAKI" | "PEREMPUAN";
  const alamat = formData.get("alamat") as string;
  const noTelepon = formData.get("noTelepon") as string;

  await prisma.pasien.update({
    where: { id },
    data: {
      nama,
      tanggalLahir: new Date(tanggalLahir),
      jenisKelamin,
      alamat,
      noTelepon,
    },
  });

  revalidatePath("/pasien");
  revalidatePath(`/pasien/${id}`);
  redirect(`/pasien/${id}`);
}

export async function deletePasien(id: string) {
  await prisma.pasien.delete({ where: { id } });
  revalidatePath("/pasien");
  redirect("/pasien");
}
