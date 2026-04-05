import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * Supabase Edge Function: process-order
 * Substitui o BullMQ/Redis do NestJS
 */
Deno.serve(async (req) => {
  try {
    const { record, type } = await req.json();

    // Apenas processa se for um NOVO pedido (INSERT)
    if (type !== 'INSERT') {
      return new Response(JSON.stringify({ message: "Not an insert operation" }), { status: 200 });
    }

    console.log(`🚀 Processando novo pedido: ${record.id} para o cliente: ${record.clientId}`);

    // LOGICA DE SUBSTITUIÇÃO DO BULLMQ/REDIS:
    // Aqui você pode integrar com e-mail ou pagamentos.
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Order processed successfully",
        orderId: record.id 
      }),
      { headers: { "Content-Type": "application/json" } },
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
