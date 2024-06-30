import request from 'supertest'
import server from '../server'

// GETTING AN ERROR WITH JEST   Jest encountered an unexpected token

//   Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

//   Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

//    By default "node_modules" folder is ignored by transformers.


describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')

        console.log(res)
    })
})