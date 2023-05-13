import autocannon, { type Result } from 'autocannon'

const fastifyUrl = 'http://localhost:3000'
const expressUrl = 'http://localhost:3001'
const nativeUrl = 'http://localhost:3002'

async function runBenchmark (url: string): Promise<Result> {
  const result = await autocannon({
    url,
    connections: 100,
    duration: 5
  })
  autocannon.printResult(result)
  return result
}

async function runBenchmarkComparison (trynumber: number = 1): Promise<void> {
  console.log('Rodando benchmark para o Fastify')
  const fastifyResult = await runBenchmark(fastifyUrl)

  console.log('Rodando benchmark para o Express')
  const expressResult = await runBenchmark(expressUrl)

  console.log('Rodando benchmark para o Node')
  const nativeResult = await runBenchmark(nativeUrl)

  compareResults(fastifyResult, expressResult, nativeResult, trynumber)
}

function compareResults (fastifyResult: Result, expressResult: Result, nativeResult: Result, trynumber: number): void {
  console.log('\nFastify vs Express vs Node - Resultados da comparação:', trynumber)

  const fastifyRequestsPerSecond = fastifyResult.requests.average
  const expressRequestsPerSecond = expressResult.requests.average
  const nativeRequestsPerSecond = nativeResult.requests.average

  console.log(`\nFastify requisições por segundo: ${fastifyRequestsPerSecond}`)
  console.log(`Express requisições por segundo: ${expressRequestsPerSecond}`)
  console.log(`Node requisições por segundo: ${nativeRequestsPerSecond}\n`)

  const ranking = [
    { name: 'Fastify', requestsPerSecond: fastifyRequestsPerSecond },
    { name: 'Express', requestsPerSecond: expressRequestsPerSecond },
    { name: 'Node', requestsPerSecond: nativeRequestsPerSecond }
  ]

  ranking.sort((a, b) => b.requestsPerSecond - a.requestsPerSecond)

  ranking.forEach((item, index) => {
    console.log(`${index + 1}º lugar: ${item.name} com ${item.requestsPerSecond} requisições por segundo`)
  })
}

runBenchmarkComparison().catch(console.error)
