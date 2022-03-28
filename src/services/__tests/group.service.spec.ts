import SequelizeMock from 'sequelize-mock';

import GroupService from '../group.service';
import Group from '../../types/group.type';
import UserGroup from '../../types/usergroup.type';

const group1: Group = {
    id: '1',
    name: 'Admin',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
};

const group2: Group = {
    id: '2',
    name: 'User',
    permissions: ['READ', 'WRITE']
};

const userGroup: UserGroup = {
    userId: '1',
    groupId: '1'
};

const updatedGroupParams: Partial<Group> = {
    name: 'Admin',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE']
};

const MockDB = new SequelizeMock();
const mockGroupModel = MockDB.define('groups', group1);
const mockUserGroupModel = MockDB.define('usergroup', userGroup);

describe('When each method is called with the appropriate parameters', () => {
    const groupService = new GroupService(mockGroupModel, mockUserGroupModel);

    test("'createGroup' returns the appropriate response", async () => {
        const returnedGroup = await groupService.createGroup(group2);

        expect(returnedGroup).toMatchObject(group2);
    });

    test("'deleteGroup' returns the appropriate response", async () => {
        const returnedGroup = await groupService.deleteGroup(group1.id);

        expect(returnedGroup).toMatchObject(group1);
    });

    test("'updateGroup' returns the appropriate response", async () => {
        const returnedGroup = await groupService.updateGroup(
            group1.id,
            updatedGroupParams
        );

        expect(returnedGroup).toMatchObject({
            ...group1,
            ...updatedGroupParams
        });
    });

    test("'getUser' returns the appropriate response", async () => {
        mockGroupModel.$queryInterface.$useHandler((query, queryOptions) => {
            if (query === 'findOne') {
                if (queryOptions[0].where.id === group1.id) return group1;
            }
        });

        const returnedGroup = await groupService.getGroup(group1.id);

        expect(returnedGroup).toMatchObject(group1);
    });

    test("'getUsers' returns the appropriate response", async () => {
        const returnedGroup = await groupService.getGroups();

        expect(returnedGroup).toMatchObject([group1]);
    });
});

describe('When each method is called with the incorrect parameters and/or there are no users', () => {
    beforeEach(() => {
        mockGroupModel.$queryInterface.$useHandler((query, queryOptions) => {
            if (query === 'findOne') return null;
            if (query === 'findAll') return null;
        });
    });

    const groupService = new GroupService(mockGroupModel, mockUserGroupModel);

    test("'deleteGroup' returns the appropriate response", async () => {
        const returnedGroup = await groupService.deleteGroup(group2.id);

        expect(returnedGroup).toBeNull();
    });

    test("'updateGroup' returns the appropriate response", async () => {
        const returnedGroup = await groupService.updateGroup(
            group2.id,
            updatedGroupParams
        );

        expect(returnedGroup).toBeNull();
    });

    test("'getUser' returns the appropriate response", async () => {
        const returnedGroup = await groupService.getGroup(group2.id);

        expect(returnedGroup).toBeNull();
    });

    test("'getUsers' returns the appropriate response", async () => {
        const returnedGroup = await groupService.getGroups();

        expect(returnedGroup).toBeNull();
    });
});
