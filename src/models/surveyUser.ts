import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Survey } from "./survey";
import { User } from "./user";

@Entity("surveys_users")
class SurveyUser {
  @PrimaryColumn()
  readonly id: string;
  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  "Usuário": User

  @Column()
  survey_id: string;

  @ManyToOne(()=> Survey)
  @JoinColumn({name:"survey_id"})
  "Pesquisa REF":Survey
  
  @Column()
  value: number;
  @CreateDateColumn()
  created_at: Date;
  //Cria uma chave UUID automaticamente quando o model é chamado pelo controller
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { SurveyUser }