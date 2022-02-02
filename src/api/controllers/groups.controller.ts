import { Request, Response } from "express";
import { Model } from "sequelize";
import { StatusCodes } from "http-status-codes";

import CONSTANTS from "../../constants";
const { GROUPS_NOT_FOUND, GROUP_NOT_FOUND } = CONSTANTS.CONTROLLER_RESPONSE;

import Group from "../../types/group.type";
import User from "../../types/user.type";
import { TransactionResult } from "../../types/transaction.type";

import { Group as GroupModel, UserGroup as UserGroupModel } from "../../models";
import GroupService from "../../services/group.service";

const groupService = new GroupService(GroupModel, UserGroupModel);

export const createGroup = async (req: Request, res: Response) => {
  const group: Group = req.body;

  const createdGroup: Model<Group> = await groupService.createGroup(group);

  return res.send(createdGroup);
};

export const getGroups = async (req: Request, res: Response) => {
  const groups = await groupService.getGroups();

  if (!groups || groups.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).send(GROUPS_NOT_FOUND);
  }

  return res.json(groups);
};

export const getGroup = async (req: Request, res: Response) => {
  const id = req.params.id as Group["id"];
  const group: Model<Group> | null = await groupService.getGroup(id);

  if (!group) {
    return res.status(StatusCodes.NOT_FOUND).send(GROUP_NOT_FOUND);
  }

  return res.json(group);
};

export const updateGroup = async (req: Request, res: Response) => {
  const groupId = req.params.id as Group["id"];

  const groupParams: Partial<Group> = {
    name: req.body.name,
    permissions: req.body.permissions,
  };

  const group: Model<Group> | null = await groupService.updateGroup(
    groupId,
    groupParams
  );

  if (!group) {
    return res.status(StatusCodes.NOT_FOUND).send(GROUP_NOT_FOUND);
  }

  return res.send(group);
};

export const addUsersToGroup = async (req: Request, res: Response) => {
  const groupId = req.params.id as Group["id"];
  const userIds = req.body.userIds as Array<User["id"]>;

  const result: TransactionResult = await groupService.addUsersToGroup(
    groupId,
    userIds
  );

  if (!result.success) {
    return res.status(StatusCodes.BAD_REQUEST).send(result);
  }

  return res.status(StatusCodes.OK).send(result);
};

export const deleteGroup = async (req: Request, res: Response) => {
  const groupId = req.params.id as Group["id"];
  const group: Model<Group> | null = await groupService.deleteGroup(groupId);

  if (!group) {
    return res.status(StatusCodes.NOT_FOUND).send(GROUP_NOT_FOUND);
  }

  return res.send(group);
};
