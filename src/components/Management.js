import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { useManagement } from "../hooks/useManagement";
import Employee from "./Employee"

const Management = () => {
  const [management, managementState, managementDispatch] = useManagement()
  const { account, salary } = managementState

  const handleChangeAccount = (e) => {
    managementDispatch({ type: "CHANGE_ACCOUNT", payload: e.target.event })
  }
  const handleChangeSalary = (e) => {
    managementDispatch({ type: "CHANGE_SALARY", payload: e.target.event })
  }
  const handleClickEmploy = async () => {
    await management.employ(account, salary);
  }
  return (
    <div>
      <Button>Feed</Button>
      <Stack spacing={3}>
        <Text>Employ people</Text>
        <Input value={account} onChange={handleChangeAccount} />
        <Input value={salary} onChange={handleChangeSalary} />
        <Button onClick={handleClickEmploy}>Employ</Button>
      </Stack>
      <Employee />
    </div>
  );
};

export default Management;