import { Box, Button, Input, InputGroup, InputLeftAddon, InputRightAddon, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { Web3Context } from "web3-hooks";
import { useManagement } from "../hooks/useManagement";
import Employee from "./Employee"

const Management = ({ contractAddress }) => {
  const [web3State] = useContext(Web3Context)
  const [management, managementState, managementDispatch] = useManagement()
  const { account, salary, sendAmount, employees_id, employees_data } = managementState

  const handleChangeAccount = (e) => {
    managementDispatch({ type: "CHANGE_ACCOUNT", payload: e.target.value })
  }
  const handleChangeSalary = (e) => {
    managementDispatch({ type: "CHANGE_SALARY", payload: e.target.value })
  }
  const handleChangeSendAmount = (e) => {
    managementDispatch({ type: "CHANGE_SEND_AMOUNT", payload: e.target.value })
  }
  const handleClickFeed = async () => {
    const tx = await web3State.signer.sendTransaction({
      to: contractAddress,
      value: ethers.utils.parseEther(sendAmount),
    })
    await tx.wait()
  }
  const handleClickEmploy = async () => {
    const tx = await management.employ(account, ethers.utils.parseEther(salary));
    await tx.wait()
  }
  useEffect(() => {
    async function getEmployees() {
      let ids = []
      let data = [{}]
      let id = 0
      try {
        await management.nbEmployee()
      } catch (e) {
        console.log(e.message)
      }
      for (let i = 1; i <= id; i++) {
        let account_ = await management.accountAt(id)
        ids.push(i)
        data.push({
          account: account_,
          salary: ethers.utils.formatEther(await management.salaryOf(account_)),
          employed_at: await management.employmentOf(account_),
          next_payout: await management.lastPayoutOf(account_),
        })
      }
      managementDispatch({ type: "LIST_EMPLOYEES", payload: ids })
      managementDispatch({ type: "UPDATE_EMPLOYEES_DATA", payload: data })
    }
    if (management) {
      getEmployees()
    }
  }, [management, managementDispatch])

  return (
    <Box margin={5}>
      <Text fontSize={30} align="center" margin={5}>Management</Text>
      <Text>Contract address: {contractAddress}</Text>
      <Stack spacing={3} margin={5}>
        <InputGroup>
          <InputLeftAddon children="Amount :" />
          <Input value={sendAmount} onChange={handleChangeSendAmount} placeholder="0.1" />
          <InputRightAddon children="ETH" />
        </InputGroup>
        <Button onClick={handleClickFeed}>Feed</Button>
      </Stack>
      <Stack spacing={3} margin={5}>
        <Text fontSize={20} align="center">Employ people</Text>
        <InputGroup>
          <InputLeftAddon children="Account :" />
          <Input value={account} onChange={handleChangeAccount} placeholder="0x0" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Salary :" />
          <Input value={salary} onChange={handleChangeSalary} placeholder="0.1" />
          <InputRightAddon children="ETH" />
        </InputGroup>
        <Button onClick={handleClickEmploy}>Employ</Button>
      </Stack>
      <Box>
        {employees_id.map(el => {
          return <Employee management={management} id={el} data={employees_data[el]} key={el} />
        })}
      </Box>
    </Box>
  );
};

export default Management;