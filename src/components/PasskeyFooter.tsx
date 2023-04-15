import { Text, Link, Flex, Icon } from "@chakra-ui/react";
import { LAST_UPDATED } from "../constants/lastUpdated";
import { Footer } from "./Footer";
import { DiGithub } from 'react-icons/di'

export const PasskeyFooter = () => (
  <Footer>
    <Flex flexDir={'column'} alignItems={'center'}>
      <Text mb="4" fontFamily="mono">By <Link isExternal href='https://twitter.com/0xjjpa'>0xjjpa</Link>.</Text>
      <Text mb="4" fontFamily="mono" fontSize="xs">MIT License code available in <Link isExternal href='https://github.com/0xjjpa/passkeys-is'>
        <Icon as={DiGithub} pt="1" />GitHub
      </Link>.</Text>
      <Text w="80%" textAlign={'center'} fontFamily="mono" fontSize="xs">{`Last updated - ${new Date(LAST_UPDATED)}`}</Text>
    </Flex>
  </Footer>

)