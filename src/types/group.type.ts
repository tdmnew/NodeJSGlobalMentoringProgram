type Permission = "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

type Group = {
  id: string;
  name: string;
  permissions: Array<Permission>;
  createdAt?: Date;
  updatedAt?: Date;
};

export default Group;
