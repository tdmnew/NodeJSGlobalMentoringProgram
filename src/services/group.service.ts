import { Model } from 'sequelize';

import {
    Group as GroupModel,
    UserGroup as UserGroupModel,
    sequelize
} from '../models';

import User from '../types/user.type';
import Group from '../types/group.type';
import UserGroup from '../types/usergroup.type';
import { TransactionResult, TransactionError } from '../types/transaction.type';

import { groupAccess } from '../data-access';

interface GroupServiceInterface {
    groupModel: typeof GroupModel;
    userGroupModel: typeof UserGroupModel;
}

const { findGroup, findGroups } = groupAccess;

class GroupService implements GroupServiceInterface {
    groupModel: GroupServiceInterface['groupModel'];
    userGroupModel: GroupServiceInterface['userGroupModel'];

    constructor(
        groupModel: GroupServiceInterface['groupModel'],
        userGroupModel: GroupServiceInterface['userGroupModel']
    ) {
        this.groupModel = groupModel;
        this.userGroupModel = userGroupModel;
    }

    async createGroup(groupParams: Partial<Group>): Promise<Model<Group>> {
        const group = await this.groupModel.create(groupParams);
        return group;
    }

    async updateGroup(
        groupId: Group['id'],
        groupParams: Partial<Group>
    ): Promise<Model<Group> | null> {
        const group = await this.groupModel.findOne(findGroup(groupId));

        if (!group) return null;

        await group.update({
            name: groupParams.name,
            permissions: groupParams.permissions
        });

        return group;
    }

    async getGroup(groupId: Group['id']): Promise<Model<Group> | null> {
        const group: Model<Group> | null = await this.groupModel.findOne(
            findGroup(groupId)
        );

        return group;
    }

    async getGroups(): Promise<Model<Group>[] | null> {
        const groups: Model<Group>[] = await this.groupModel.findAll(
            findGroups()
        );

        if (!groups) return null;

        return groups;
    }

    async deleteGroup(groupId: Group['id']): Promise<Model<Group> | null> {
        const group = await this.groupModel.findOne(findGroup(groupId));

        if (!group) return null;

        await group.destroy();

        return group;
    }

    async addUsersToGroup(
        groupId: Group['id'],
        userIds: Array<User['id']>
    ): Promise<TransactionResult> {
        try {
            await sequelize.transaction(async (t) => {
                const groups: UserGroup[] = userIds.map((userId) => ({
                    groupId,
                    userId
                }));

                return await this.userGroupModel.bulkCreate(groups, {
                    transaction: t
                });
            });

            return { success: true };
        } catch (err) {
            const { original, errors } = err as TransactionError;

            const errorMessages = errors ? errors.map((e) => e.message) : [];

            console.error(err);

            return {
                success: false,
                message: original.detail,
                errors: errorMessages
            };
        }
    }
}

export default GroupService;
