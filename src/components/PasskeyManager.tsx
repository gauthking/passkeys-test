import { AddIcon, ExternalLinkIcon, HamburgerIcon, ViewIcon } from "@chakra-ui/icons";
import { Text, Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast, MenuGroup, Tag, Icon, Flex, SimpleGrid } from "@chakra-ui/react";
import { useLocalStorage } from 'usehooks-ts'

import { Passkey, truncate } from "../lib/passkey";
import { logger } from "../lib/logger";
import { CircleIcon } from "./atoms/CircleIcon";

export const PasskeyManager = () => {
  const toast = useToast()
  const [credentialRawIdAsBase64, setCredentialRawIdAsBase64] = useLocalStorage('credentialRawIdAsBase64', null)
  const [publicKeyAsHexString, setPublicKeyAsHexstring] = useLocalStorage('publicKeyAsHexString', null)
  const [credentialId, setCredentialId] = useLocalStorage('credentialId', null)

  const createCredentialHandler = async () => {
    const { data: credential, response, error } = await Passkey.create({
      appName: 'Passkey',
      username: 'Demo Username',
      email: 'test@demo.com'
    });
    if (error) {
      logger.error('(🪪,❌) Error', error)
      toast({
        title: 'Error creating credential.',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if (credential) {
      logger.info('(🪪,✅) Credential', credential)
      toast({
        title: 'Credential created.',
        description: 'Your credential has been created.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      const rawIdAsBase64 = btoa(String.fromCharCode.apply(null, new Uint8Array(credential.rawId)))
      setCredentialId(credential.id)
      setCredentialRawIdAsBase64(rawIdAsBase64)
    }
    if (response) {
      // @TODO: Ensure type casting is not needed.
      const { data: publicKeyAsHexString } = Passkey.getPublicKeyAsHexStringFromAttestationResponse({ response } as { response: AuthenticatorAttestationResponse });
      setPublicKeyAsHexstring(publicKeyAsHexString)
    }
  }

  const getAssertionHandler = async () => {
    const { data: assertion, error } = await Passkey.get({});
    if (error) {
      logger.error('(🪪,❌) Error', error)
      toast({
        title: 'Error retrieving assertion.',
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    if (assertion) {
      logger.info('(🪪,✅) Assertion', assertion)
      toast({
        title: 'Assertion obtained.',
        description: 'Your assertion has been retrieved.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <Box
      position="fixed"
      top={4}
      left={4}
    >
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
        />
        <MenuList>
          <MenuGroup title='Operations'>
            <MenuItem
              aria-label="Create Passkey"
              onClick={createCredentialHandler}
              icon={<AddIcon />} command="test@demo.com">
              <Text>Create Passkey</Text>
            </MenuItem>
          </MenuGroup>
          <MenuItem
            aria-label="Load Passkey"
            onClick={getAssertionHandler}
            icon={<ViewIcon />} command="Any available">
            <Text>Load Passkey</Text>
          </MenuItem>
          <MenuGroup title='Current key'>
            {
              (credentialId && publicKeyAsHexString) ?
                <MenuItem icon={<CircleIcon color='green.500' />}>
                  <SimpleGrid columns={1}>
                    <Text fontFamily='mono' fontSize='xs'>Credential Id: {credentialId}</Text>
                    <Text fontFamily='mono' fontSize='xs'>Public Key: {truncate(publicKeyAsHexString)}</Text>
                  </SimpleGrid>
                </MenuItem>
                :
                <MenuItem icon={<CircleIcon color='red.500' />}>
                  <Text fontFamily='mono' fontSize='xs'>No key available in local storage.</Text>
                </MenuItem>
            }
          </MenuGroup>
        </MenuList>
      </Menu>
    </Box>
  );
}