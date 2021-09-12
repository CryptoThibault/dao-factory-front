import { Box, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CompanyList = ({ ids, data }) => {
  return (
    <Box>
      {ids.map(el => {
        return (
          <Link to={`/${el}`}>
            <Text>{data[el].name}</Text>
            <Text>{data[el].daoAddress}</Text>
          </Link>
        )
      })}
    </Box>
  );
};

export default CompanyList;