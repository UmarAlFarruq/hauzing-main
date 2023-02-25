
import { Col, Form, message, Row, } from "antd";
import Map from "../../Generic/Map";
import { AntdInput, Button, Checkbox } from "../../Generic";
import { Container, Title, WrapperCard, Wrapper, } from "./style";
import { useMutation } from 'react-query';
import { useHttp } from './../../../hooks/useHttp';
import AntdSelect from "../../Generic/AntdSelect";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AddHouse = () => {
  const navigate = useNavigate();
  const { request } = useHttp();
  const [position, SetPosition] = useState({
    latitude: 41.2559,
    longitude: 69.2401
  })
  const map = ({ lat, lng }) => {
    SetPosition({ longitude: lng, latitude: lat })
  }

  const { mutate } = useMutation(({ body }) => {
    console.log('bodyIndex:', body);
    return request({
      url: '/v1/houses',
      method: 'POST',
      token: true,
      body
    })
  })
  const onSubmit = (value) => {
    const body = {
      ...value,
      locations: {
        ...position
      },
      favorite: true,
      attachments: [
        { imgPath: value.imgPath },
        { imgPath: value.imgPath }
      ],
      status: true,
      zipCode: "string",
      name: "name",
    }
    mutate({ body },
      {
        onSuccess: res => {
          message.success('Successfully completed')
          navigate(`/profile/properties`)
          // naviga 
        },
        onError: err => {
          message.error('The command failed')
        }
      })
    // console.log(obj);
  }

  return (
    <Wrapper>
      <Container>
        <Form
          onFinish={onSubmit}
        >
          <Title.Title size={28} mt={34}  >Add new property</Title.Title>
          {/* Contact information */}
          <WrapperCard>
            <Row>
              <Col span={24} >
                <Title.Title size={18} mb={20} >Contact information</Title.Title>
              </Col>
              <Col span={12}  >
                <AntdInput placeholder='Property title*' />
              </Col>
              <Col span={12} >
                <AntdSelect name='categoryId' placeholder={'Category*'} />
                {/* <AntdInput  /> */}
              </Col>
              <Col span={24} >
                <AntdInput name='description' width={'100%'} placeholder='Property Description*' />
              </Col>
            </Row>
          </WrapperCard>
          {/* Additional */}
          <WrapperCard>
            <Row>
              <Col span={24} >
                <Title.Title size={18} mb={20} >Additional</Title.Title>
              </Col>
              <Col span={8}  >
                <AntdInput name={['houseDetails', 'bath']} type={true} placeholder='Baths' />
                <AntdInput name={['houseDetails', 'yearBuilt']} type={true} placeholder='Year build' />
                {/* <AntdInput name='Property title' placeholder='Label' />
                <AntdInput name='Property title' placeholder='Lot area (sqft)' /> */}
              </Col>
              <Col span={8} >
                <AntdInput name={['houseDetails', 'beds']} type={true} placeholder='Beds' />
                <AntdInput name={['houseDetails', 'area']} type={true} placeholder={'Home area (sqft)'} />
                {/* <AntdInput name='Type' placeholder={'Parent property'} />
                <AntdInput name='Type' placeholder={'Material'} />
                <AntdInput name='Type' placeholder={'Baths'} /> */}
              </Col>
              <Col span={8} >
                <AntdInput name={['houseDetails', 'garage']} type={true} placeholder={'Garages'} />
                <AntdInput name={['houseDetails', 'room']} type={true} placeholder={'Rooms'} />
                {/* <AntdInput name='Type' placeholder={'Status'} />
                <AntdInput name='Type' placeholder={'Lot dimensions'} /> */}
              </Col>
            </Row>
          </WrapperCard>
          {/* Price  */}
          <WrapperCard>
            <Row>
              <Col span={24} >
                <Title.Title size={18} mb={20} >Price</Title.Title>
              </Col>
              <Col span={12}  >
                <AntdInput name='price' type={true} placeholder='Price ($)' />
                {/* <AntdInput name='Property title' placeholder='Price Suffix' /> */}
              </Col>
              <Col span={12} >
                <AntdInput name='salePrice' type={true} placeholder={'Sale Price '} />
                {/* <AntdInput name='Type' placeholder={'Price Custom'} /> */}
              </Col>
            </Row>
          </WrapperCard>
          {/* Location */}
          <WrapperCard>
            <Row>
              <Col span={24} >
                <Title.Title size={18} mb={20} >Location</Title.Title>
              </Col>
              <Col span={12}  >
                <AntdInput name='country' placeholder='Country' />
                <AntdInput name='region' placeholder='Regions' />
              </Col>
              <Col span={12} >
                <AntdInput name='city' placeholder=' City' />
                <AntdInput name='address' placeholder=' Address' />
              </Col>
              {/* <Col span={24} >
                <AntdInput description='' width={'98%'} placeholder='Map location' />
              </Col> */}
              <Col span={24} style={{ marginBottom: '24px' }} >
                <Map position={map} />
              </Col>
              {/* <Col span={12}>
                <AntdInput name='Property title' placeholder='Latidude' />
              </Col>
              <Col span={12} >
                <AntdInput name='Type' placeholder='Logtitude' />
              </Col> */}
            </Row>
          </WrapperCard>
          {/* Amenities */}
          <WrapperCard>
            <Row>
              <Col span={24} >
                <Title.Title size={18} mb={20} > Amenities</Title.Title>
              </Col>
              <Col span={6} >
                <Checkbox name={['homeAmenitiesDto', 'busStop']} >Bus stop</Checkbox>
                <Checkbox name={['homeAmenitiesDto', 'garden']} >Garden</Checkbox>
                <Checkbox name={['homeAmenitiesDto', 'superMarket']} >Super market</Checkbox>
                <Checkbox name={['componentsDto', 'airCondition']} >Air condition</Checkbox>
              </Col>
              <Col span={6} >
                <Checkbox name={['homeAmenitiesDto', 'market']} >Market</Checkbox>
                <Checkbox name={['homeAmenitiesDto', 'park']} >Park</Checkbox>
                <Checkbox name={['componentsDto', 'furniture']} >Furniture</Checkbox>
                <Checkbox name={['componentsDto', 'courtyard']} >Courtyard</Checkbox>
              </Col>
              <Col span={6} >
                <Checkbox name={['homeAmenitiesDto', 'parking']} >Parking</Checkbox>
                <Checkbox name={['homeAmenitiesDto', 'school']} >School</Checkbox>
                <Checkbox name={['componentsDto', 'gasStove']} >Gas stove</Checkbox>
                <Checkbox name={['componentsDto', 'internet']} >Internet</Checkbox>
              </Col>
              <Col span={6} >
                <Checkbox name={['homeAmenitiesDto', 'stadium']} >Stadium</Checkbox>
                <Checkbox name={['homeAmenitiesDto', 'subway']} > Subway</Checkbox>
                <Checkbox name={['componentsDto', 'tv']} >Televizor</Checkbox>
              </Col>
              <Col span={24}>
                <AntdInput name={['homeAmenitiesDto', 'additional']} placeholder='Additional' />
                <AntdInput name='imgPath' placeholder='img link' />
              </Col>
            </Row>
          </WrapperCard>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
            <Button htmlType='submit' type={'primary'} mt={32} width={'280px'} >Submit</Button>
          </div>
        </Form>
      </Container>
    </Wrapper>
  );
}
export default AddHouse;


          // {/* Media */}
          // {/* <WrapperCard>
          //   <Row>
          //     <Col span={24} >
          //       <Title.Title size={18} mb={20} > Media</Title.Title>
          //     </Col>
          //     <Title.D>Featured image</Title.D>
          //     <Col span={24}>
          //       <Img />
          //       <Img />
          //       <Img />
          //       <Img />
          //     </Col>
          //     <Col span={24} >
          //       <Button type='secondary' width='200px' mt={32} >Upload</Button>
          //       <Title.D  >Gallery</Title.D>
          //     </Col>
          //     <Col span={24}>
          //       <Button type='secondary' width='200px' mt={32} >Upload</Button>
          //       <Title.D  >Attachment</Title.D>
          //     </Col>
          //     <Col span={24}>
          //       <Title.D  >test_property.pdf</Title.D>
          //       <Button mb={20} type='secondary' width='200px' mt={32} >Upload</Button>
          //     </Col>
          //     <Col span={24}>
          //       <AntdInput placeholder='Video Link' />
          //       <AntdInput placeholder='Virtual tour' />
          //     </Col>
          //   </Row>
          // </WrapperCard> */}
          // {/* Amenities */}

          // {/* Select Energy Class */}

          // {/* <WrapperCard>
          //   <Title.Title size={18} >Select Energy Class</Title.Title>
          //   <Row style={{ marginTop: '16px' }}>
          //     <Col span={12}  >
          //       <AntdInput placeholder='Energy class' />
          //     </Col>
          //     <Col span={12} >
          //       <AntdInput placeholder='Energy Index in kWh/m2a' />
          //     </Col>
          //   </Row>
          // </WrapperCard> */}