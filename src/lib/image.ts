const maxImageFileSize = 5 * 1024 * 1024;
const maxImageDimension = 1200;

export async function compressImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Selecciona un archivo de imagen.");
  }
  if (file.size > maxImageFileSize) {
    throw new Error("La imagen debe pesar menos de 5 MB.");
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxImageDimension / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    throw new Error("No se pudo procesar la imagen seleccionada.");
  }

  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const compressedImage = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }
        reject(new Error("No se pudo comprimir la imagen seleccionada."));
      },
      "image/jpeg",
      0.78,
    );
  });

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("No se pudo leer la imagen comprimida."));
    });
    reader.addEventListener("error", () => {
      reject(reader.error ?? new Error("No se pudo leer la imagen."));
    });
    reader.readAsDataURL(compressedImage);
  });
}
