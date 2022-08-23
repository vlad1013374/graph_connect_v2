import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/users/users.model";
import { Role } from "./roles.model";

interface UserRolesCreationAttrs{
    user_id: number;
    role_id: number;
}


@Table({tableName: 'user_roles', timestamps: false})
export class UserRoles extends Model<UserRoles, UserRolesCreationAttrs> {

    @ForeignKey( () => User)
    @Column({ type: DataType.INTEGER})
    user_id: number;

    @ForeignKey( () => Role)
    @Column({ type: DataType.INTEGER})
    role_id: number;
}