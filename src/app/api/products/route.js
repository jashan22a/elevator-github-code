import { products } from "./productList";

export async function GET() {
  return new Response(
    JSON.stringify({
      data: products,
      message: "All products fetched successfully",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
