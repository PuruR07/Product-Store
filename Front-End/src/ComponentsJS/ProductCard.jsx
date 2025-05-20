import { useColorModeValue } from '@/components/ui/color-mode'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../../Store/product';

function ProductCard({ product }) {
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray-600", "whitesmoke");
    const bg = useColorModeValue("white", "gray-800");
    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const handleDeleteProduct = async (product_id) => {
        const { success, message } = await deleteProduct(product_id);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }
        else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    }
    const handleUpdatedProduct = async(product_id, updatedProduct)=>{
        const {success, message} = await updateProduct(product_id, updatedProduct);
        onClose();
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true
            })
        } else {
            toast({
                title: "Success",
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
    }
    return (
        <Box
            cursor={'pointer'}
            shadow={"lg"}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
            bg={bg}>
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}></Image>
            <Box p={4} >
                <Heading as={'h3'} size={'md'} mb={2} color={textColor}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}

                            />
                            <Input placeholder='Product Price'
                                name='price'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}

                                type='number'
                            />
                            <Input placeholder='Product Image'
                                name='image'
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}

                            />

                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' m={3} onClick={()=>handleUpdatedProduct(product._id, updatedProduct)}>Update</Button>
                        <Button variant={'ghost'} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard