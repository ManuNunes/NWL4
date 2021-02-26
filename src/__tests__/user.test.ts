import request from "supertest";
import { app } from "../app";
import createConnection from './../database';


describe("Users", () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    it("Deve criar um novo usuário", async () => {
        const response = await request(app).post("/Users").send({
        email: "exemplo@",
        name: "User Exemple "
        })
    expect(response.status).toBe(201)
    })

    it("Não pode criar email repetido", async()=>{
      const response = await request(app).post("/Users").send({
        email: "exemplo@",
        name: "User Exemple "
        })
        expect(response.status).toBe(400)
    })

    

})