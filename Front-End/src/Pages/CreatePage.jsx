import { useColorModeValue } from '@/components/ui/color-mode';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import React, {useState} from 'react'
import { useProductStore } from '../../Store/product';


const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  
  const {createProduct} = useProductStore()
  const toast = useToast();

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
    console.log("success: ", success)
    console.log("message: ", message);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
    else{
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }
    setNewProduct({
      name: "",
      price: "",
      image: "",
    })
  }

  const handleProductName = (e) => {
    setNewProduct({...newProduct, name: e.target.value})
  }
  const handleProductPrice = (e) => {
    setNewProduct({...newProduct, price: e.target.value})
  }
  const handleProductImage = (e) => {
    setNewProduct({...newProduct, image: e.target.value})
  }

  return (
    <Container maxW={"60%"}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'4xl'} textAlign={'center'} mb={8}>Create New Product</Heading>
        <Box w={'full'} bg={useColorModeValue('white', 'gray.800')} p={6} rounded={'lg'} shadow={'md'}>
          <VStack size={'lg'}>

            <Input type="text" placeholder='Product Name' name='name' value={newProduct.name} borderColor={useColorModeValue('#121212', 'whitesmoke')} p={6}  onChange={handleProductName} color={useColorModeValue('#121212', 'whitesmoke')}></Input>
            <Input type="number" placeholder='Product Price' name='price' value={newProduct.price} borderColor={useColorModeValue('#121212', 'whitesmoke')} p={6} onChange={handleProductPrice} color={useColorModeValue('#121212', 'whitesmoke')}></Input>
            <Input placeholder='Image URL' name='image' type='url' value={newProduct.image} borderColor={useColorModeValue('#121212', 'whitesmoke')} p={6} onChange={handleProductImage} color={useColorModeValue('#121212', 'whitesmoke')}></Input>
            <Button colorScheme='blue' w={'full'} onClick={handleAddProduct}>Add Product</Button>

          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage