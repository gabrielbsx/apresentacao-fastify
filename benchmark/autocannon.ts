import autocannon, { type Result } from 'autocannon'

const fastifyUrl = 'http://localhost:3000'
const expressUrl = 'http://localhost:3001'

async function runBenchmark (url: string): Promise<Result> {
  const result = await autocannon({
    url,
    connections: 100,
    duration: 5
  })
  autocannon.printResult(result)
  return result
}

async function runBenchmarkComparison (): Promise<void> {
  console.log('Rodando benchmark para o Fastify')
  const fastifyResult = await runBenchmark(fastifyUrl)

  console.log('Rodando benchmark para o Express')
  const expressResult = await runBenchmark(expressUrl)

  console.log('Fastify vs Express')
  compareResults(fastifyResult, expressResult)
}

function compareResults (fastifyResult: Result, expressResult: Result): void {
  const fastifyRequestsPerSecond = fastifyResult.requests.average
  const expressRequestsPerSecond = expressResult.requests.average
  const difference = fastifyRequestsPerSecond - expressRequestsPerSecond

  console.log(`Fastify requisições por segundo: ${fastifyRequestsPerSecond}`)
  console.log(`Express requisições por segundo: ${expressRequestsPerSecond}`)
  console.log(`A diferença é de ${difference.toFixed(2)} requisições por segundo`)

  if (fastifyRequestsPerSecond > expressRequestsPerSecond) {
    console.log('Fastify é mais rápido')
  } else if (fastifyRequestsPerSecond < expressRequestsPerSecond) {
    console.log('Express é mais rápido')
  } else {
    console.log('Fastify e Express são igualmentes rápidos')
  }
}

runBenchmarkComparison().catch(console.error)
