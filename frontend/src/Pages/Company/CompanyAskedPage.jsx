import React from 'react'
import CompanyCard from '../../Components/CompanyCard/CompanyCard'
import Logo from '../../assets/amazon.png'
import { Box, Grid, Heading } from '@chakra-ui/react'

const CompanyAskedPage = () => {
  const data = [
    {
      companyLogo: Logo,
      companyName: "Amazon",
      companyQuestion: "Amazon Spring '23 High Frequency",
      description: " If you're wrapping an icon from react-icons, you need to also wrap the icon in a span element as react-icons icons do not use forwardRef."
    },
    {
      companyLogo: Logo,
      companyName: "Amazon",
      companyQuestion: "Amazon Spring '23 High Frequency",
      description: " If you're wrapping an icon from react-icons, you need to also wrap the icon in a span element as react-icons icons do not use forwardRef."
    },
    {
      companyLogo: Logo,
      companyName: "Amazon",
      companyQuestion: "Amazon Spring '23 High Frequency",
      description: " If you're wrapping an icon from react-icons, you need to also wrap the icon in a span element as react-icons icons do not use forwardRef."
    },
  ]
  return (
    <>
      <Box width={"100%"} p={10}>
       <Box width={"80%"} margin={"0 auto"} mb={5}
       color={"#ed8936"}> <Heading >Top Questions</Heading></Box>
        <Grid templateColumns='repeat(2, 1fr)' gap={3}
        rowGap={0}
          width={"80%"} margin={"0 auto"}>
          {
            data.map((d, index) => {
              return (
                <CompanyCard key={index} data={d} />
              )
            })
          }
        </Grid>
      </Box>
    </>
  )
}

export default CompanyAskedPage
