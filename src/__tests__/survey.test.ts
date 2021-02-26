import request from "supertest";
import { app } from "../app";
import createConnection from '../database';


describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it("Deve criar uma nova pesquisa", async () => {
        const response = await request(app).post("/Surveys").send({
        title: "Title Exemple",
        description: "Description Exemple "
        })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id")
    })

    it(" ser capaz de listar todas as pesquisas",async ()=>{
      await request(app).post("/Surveys").send({
        title:"Titulo 2",
        description:"Description 2"
      })
      const response = await request(app).get('/Surveys')

      expect(response.body.length).toBe(2)
    })
})