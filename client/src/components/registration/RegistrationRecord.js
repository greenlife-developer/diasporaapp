import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const RegistrationRecord = ({ registration }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{registration.otherNames}</Typography>
        <Typography>{registration.email}</Typography>
        <Typography>{registration.phone}</Typography>
        {/* <Typography>{registration.address}</Typography> */}
      </CardContent>
    </Card>
  );
};

export default RegistrationRecord;