import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import {v4 as uuid } from 'uuid'

@Entity("users")

class User{
    @PrimaryColumn()
    readonly id:string;
    @Column()
    name:string;
    @Column()
    email:string;
    @CreateDateColumn()
    created_at:Date
    //Cria uma chave UUID automaticamente quando o model é chamado pelo controller, se não existir
    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export {User}