import React from "react";
import { Typography, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { IGroup, IUserItem } from "../../../interfaces/entities";
import { api } from "../../../api";
import { useAppSelector } from "../../../hooks/hooks";
import GroupInside from "./GroupInside";
import GroupPromo from "./GroupPromo";

const ViewGroupPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = React.useState<IGroup | null>(null);
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleCreateTred = () => {
    navigate(`/groups/${groupId}/treds/create`);
  };

  const handleEnter = () => {
    setIsLoading(true);
    api.group
      .enter(+groupId!)
      .then((data) => {
        setGroup(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGenerateLink = () => {
    const error: Promise<string> = api.group
      .generateLink(group!.id)
      .then((data) =>
        setGroup({
          ...group,
          ...data,
        } as IGroup)
      )
      .catch((err) => err.message);
    return error;
  };

  const handleInvite = (email: string) => {
    const error: Promise<string> = api.group
      .invite(group!.id, email)
      .then(setGroup)
      .catch((err) => err.message);
    return error;
  };

  const handleLeave = () => {
    const error = api.group
      .leave(group!.id)
      .then(() => navigate("/groups"))
      .catch((err) => err.message);
    return error;
  };

  const handleKickOut = (user: IUserItem) => {
    const error = api.group
      .kickOut(group!.id, user)
      .then(setGroup)
      .catch((err) => err.message);
    return error;
  };

  const handleDelegateAdmin = (user: IUserItem) => {
    const error = api.group
      .delegateAdmin(group!.id, user)
      .then(setGroup)
      .catch((err) => err.message);
    return error;
  };

  React.useEffect(() => {
    // запрос на получение группы
    setIsLoading(true);
    api.group
      .getGroup(+groupId!)
      .then((data) => {
        setGroup({
          ...data,
          treds: [
            ...data.treds,
            // ...Array(20).fill({
            //   id: 1,
            //   name: "tred",
            //   description: "123",
            //   isOpen: true,
            //   closeDate: "123",
            //   isPublic: true,
            //   maxPackages: 10,
            // }),
          ],
        });
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="page">
      {isLoading ? (
        <CircularProgress />
      ) : group ? (
        group.members.some((member) => member.id === user?.id) ? (
          <GroupInside
            user={user!}
            handleCreateTred={handleCreateTred}
            group={group}
            handleInvite={handleInvite}
            handleGenerateLink={handleGenerateLink}
            handleLeave={handleLeave}
            handleKickOut={handleKickOut}
            handleDelegateAdmin={handleDelegateAdmin}
          />
        ) : (
          <GroupPromo group={group} handleEnter={handleEnter} />
        )
      ) : (
        <Typography>{error}</Typography>
      )}
    </div>
  );
};

export default ViewGroupPage;
