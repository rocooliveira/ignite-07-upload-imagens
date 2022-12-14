import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return(
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay/>
      <ModalContent
        mx="auto"
        w="auto"
        h="auto"
        maxW={['320px', '500px', '900px']}
        maxH={['370px', '550px', '600px']}

      >
        <ModalBody p={0} >
          <Image src={imgUrl} maxW={['320px', '500px', '900px']}/>
        </ModalBody>
        <ModalFooter bg="pGray.800" h={8} py={5} borderBottomRadius={1.5}>
          <Link href={imgUrl} isExternal fontSize="md" me="auto">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
