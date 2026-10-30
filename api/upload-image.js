const IMGBB_API_KEY = "d7e3281c2a4a9b0e0061e2eca403b1e3";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { image, name } = request.body ?? {};
    if (typeof image !== "string" || image.length === 0) {
      return response.status(400).json({ error: "La imagen es requerida" });
    }

    const params = new URLSearchParams({ image, key: IMGBB_API_KEY });
    if (typeof name === "string" && name) {
      params.set("name", name);
    }

    const imgbbResponse = await fetch("https://api.imgbb.com/1/upload", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    const result = await imgbbResponse.json();

    if (!imgbbResponse.ok || !result.success) {
      return response.status(502).json({
        error: result?.error?.message || "ImgBB no pudo subir la imagen",
      });
    }

    return response.status(200).json({ url: result.data.url });
  } catch (error) {
    console.error("ImgBB proxy error:", error);
    return response.status(502).json({ error: "No se pudo subir la imagen" });
  }
}