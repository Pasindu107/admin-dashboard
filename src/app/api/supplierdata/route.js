let supplierData = [];

export async function GET(req) {
  return new Response(JSON.stringify(supplierData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    supplierData = body;
    return new Response(JSON.stringify({ message: 'Data stored successfully' }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error storing data' }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
