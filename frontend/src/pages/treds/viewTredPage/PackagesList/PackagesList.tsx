import React from "react";
import { Button, List, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IPackageItem } from "../../../../interfaces/entities";
import PackageItem from "./PackageItem";

interface IProps {
  packages: IPackageItem[];
  groupId: number;
  tredId: number;
}

const PackagesList: React.FC<IProps> = ({ packages, groupId, tredId }) => {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/groups/${groupId}/treds/${tredId}/packages/${id}`);
  };

  return (
    <List>
      {packages.length > 0 ? (
        packages.map((pack, index) => (
          <PackageItem
            pack={pack}
            onClick={() => handleClick(pack.id)}
            index={index + 1}
            key={pack.id}
          />
        ))
      ) : (
        <>
          <Typography>В этом треде пока нет посылок</Typography>
        </>
      )}
    </List>
  );
};

export default PackagesList;
