import request from "supertest";
import { getConnection } from "typeorm";
import { app } from "../app";
import createConnection from './../database';


describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it("Deve criar um novo usuário", async () => {
    const response = await request(app).post("/Users").send({
      email: "exemplo@com.br",
      name: "User Exemple "
    })
    expect(response.status).toBe(201)
  })

  it("Não pode criar email repetido", async () => {
    const response = await request(app).post("/Users").send({
      email: "exemplo@com.br",
      name: "User Exemple2 "
    })
    expect(response.status).toBe(400)
  })



})