import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";



@Table({tableName: 'user_roles', timestamps: false})
export class UserRoles extends Model<UserRoles> {

    @ForeignKey( () => User)
    @Column({ type: DataType.INTEGER})
    user_id: number;

    @ForeignKey( () => Role)
    @Column({ type: DataType.INTEGER})
    role_id: number;
}