import Group from '../types/group.type';
import { User } from '../models';

export const findGroup = (groupId: Group['id']) => ({
    include: [
        {
            model: User,
            as: 'users'
        }
    ],
    where: { id: groupId }
});

export const findGroups = () => ({
    include: [
        {
            model: User,
            as: 'users'
        }
    ]
});
