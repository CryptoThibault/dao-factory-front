import { Box, Button, Text } from "@chakra-ui/react";
import SimpleDateTime from 'react-simple-timestamp-to-date';

const Employee = ({ management, id, data }) => {
  const handleClickFire = async () => {
    const tx = await management.fire(data.account);
    await tx.wait()
  }
  const handleClickResign = async () => {
    const tx = await management.resign();
    await tx.wait()
  }
  const handleClickPayout = async () => {
    const tx = await management.payout();
    await tx.wait()
  }
  return (
    <Box>
      <Text>Address: {data.account}</Text>
      <Text>Salary: {data.salary}</Text>
      <Text>Employed at:  <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{data.employed_at}</SimpleDateTime></Text>
      <Text>Next Payout Timestamp:  <SimpleDateTime dateFormat="DMY" dateSeparator="/" timeSeparator=":">{data.next_payout}</SimpleDateTime></Text>
      <Text>Id: {id}</Text>
      <Button onClick={handleClickFire}>Fire this employee</Button>
      <Button onClick={handleClickResign}>Resign from this job</Button>
      <Button onClick={handleClickPayout}>Get my paid</Button>
    </Box>
  );
};

export default Employee;