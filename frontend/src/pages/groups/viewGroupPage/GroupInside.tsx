import React from "react";
import {
  Typography,
  Box,
  Container,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import InviteDialog from "../../../components/InviteDialog/InviteDialog";
import { IGroup, IUser, IUserItem } from "../../../interfaces/entities";
import TredsList from "./TredsList/TredsList";
import UsersList from "./UsersList/UsersList";
import Snack from "../../../components/Snack/Snack";

interface IGroupInfoProps {
  handleCreateTred: () => void;
  user: IUser;
  group: IGroup;
  handleInvite: (email: string) => Promise<string>;
  handleGenerateLink: () => Promise<string>;
  handleLeave: () => Promise<string>;
  handleKickOut: (user: IUserItem) => Promise<string>;
  handleDelegateAdmin: (user: IUserItem) => Promise<string>;
}

const GroupInside: React.FC<IGroupInfoProps> = ({
  handleCreateTred,
  handleInvite,
  user,
  group,
  handleGenerateLink,
  handleLeave,
  handleKickOut,
  handleDelegateAdmin,
}) => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = React.useState(false);
  const [inviteError, setInviteError] = React.useState("");
  const [inviteLinkError, setInviteLinkError] = React.useState("");

  const [error, setError] = React.useState("");

  const handleInviteDialogOpen = () => {
    setIsInviteDialogOpen(true);
  };
  const handleInviteDialogClose = () => {
    setInviteError("");
    setIsInviteDialogOpen(false);
  };

  const invite = (email: string) => {
    handleInvite(email).then((error) => {
      if (!error) {
        handleInviteDialogClose();
        setInviteError("");
      } else {
        setInviteError(error);
      }
    });
  };

  const generate = () => {
    handleGenerateLink().then((error) => {
      setInviteLinkError(error || "");
    });
  };

  const leave = () => {
    handleLeave().then((error) => setError(error || ""));
  };
  const kickOut = (user: IUserItem) => {
    handleKickOut(user).then((error) => setError(error || ""));
  };
  const delegateAdmin = (user: IUserItem) => {
    handleDelegateAdmin(user).then((error) => setError(error || ""));
  };

  return (
    <>
      <Box sx={{ display: "flex", marginTop: "20px", maxWidth: "80vw" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            border: "1px solid black",
            minWidth: "40vw",
            maxWidth: "50vw",
            overflowWrap: "break-word",
          }}
        >
          <Typography variant="h6">{group.name}</Typography>
          <Container>
            <TredsList treds={group.treds} groupId={group.id} />
            {user.id === group.admin.id && (
              <Button onClick={handleCreateTred}>Создать тред</Button>
            )}
          </Container>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid black",
            maxWidth: "30vw",
            minWidth: "20vw",
            overflowWrap: "break-word",
          }}
        >
          <UsersList
            members={group.members}
            groupId={group.id}
            user={user}
            adminId={group.admin.id}
            kickOut={kickOut}
            delegateAdmin={delegateAdmin}
          />
          {user.id === group.admin.id && (
            <Button onClick={handleInviteDialogOpen}>
              Приласить в сообщество
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          border: "1px solid black",
        }}
      >
        <Button color="error" onClick={leave}>
          Выйти из сообщества
        </Button>
      </Box>
      <InviteDialog
        isOpen={isInviteDialogOpen}
        onClose={handleInviteDialogClose}
        invite={invite}
        generate={generate}
        inviteLink={group.inviteLink || ""}
        inviteLinkError={inviteLinkError}
        inviteError={inviteError}
      />{" "}
      <Snack
        isOpen={error.length > 0}
        onClose={() => setError("")}
        text={error}
      />
    </>
  );
};

export default GroupInside;
