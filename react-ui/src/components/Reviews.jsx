import React from 'react'
import { Image, Header, Table, Rating } from 'semantic-ui-react'

let exampleApi = {
  sony: [{
    name: 'Sony 85mm 1.8',
    lensImage: 'https://cdn.dxomark.com/dakdata/measures/Optics/Sony_FE_85mm_F18/Marketing_PV/Sony_FE_85mm_F18.png',
    mount: 'Sony FE Mount',
    rating: 4.9,
    comments: 'Sharp amazing lens Sharp amazing lens!' 
  }, {
    name: 'Sigma 30mm 1.4',
    lensImage: 'https://cdn.dxomark.com/wp-content/uploads/2017/09/Sigma-30mm-f-1.4-DC-DN-C-lens-review-Sony-E-top-ranking-prime.jpg',
    mount: 'Sony E Mount',
    rating: 4.5,
    comments: 'Sharp affordable lens' 
  }],
  canon: [{
    name: 'Canon EF 50mm 1.8',
    lensImage: 'https://cdn.dxomark.com/wp-content/uploads/2017/09/Canon-EF-50mm-F1.8-STM-lens-review-Thrifty-fifty.jpg',
    mount: 'Canon EF Mount',
    rating: 4.5,
    comments: 'Sharp amazing lens, super affordable' 
  }, {
    name: 'Canon 24-70mm 2.8',
    lensImage: 'https://cdn.dxomark.com/dakdata/measures/Optics/Canon_EF_24_70mm_F28L_II_USM/Marketing_PV/Canon_EF_24_70mm_F28L_II_USM.png',
    mount: 'Canon EF Mount',
    rating: 5,
    comments: 'Great Lens!  Super fast and sharp, Highly recommend!' 
  }],
  nikon: [{
    name: 'Nikon 28mm 1.8',
    lensImage: 'https://cdn.dxomark.com/dakdata/measures/Optics/Nikon_AF_S_Nikkor_28mm_F18G/Marketing_PV/Nikon_AF_S_Nikkor_28mm_F18G.png',
    mount: 'Nikon FX Mount',
    rating: 2.7,
    comments: 'Dull lens, slow AF' 
  }, {
    name: 'Nikon 200mm 2',
    lensImage: 'https://cdn.dxomark.com/dakdata/measures/Optics/Nikon_AF_S_Nikkor_200mm_f2G_ED_VR_II/Marketing_PV/Nikon_AF_S_Nikkor_200mm_f2G_ED_VR_II.png',
    mount: 'Nikon FX Mount',
    rating: 3.7,
    comments: 'Sharp amazing lens' 
  }],
  fuji: [{
    name: 'Fuji 35mm 1.4',
    lensImage: 'https://images-na.ssl-images-amazon.com/images/I/51XMGWzEqoL._AC_US436_FMwebp_QL65_.jpg',
    mount: 'Fuji X Mount',
    rating: 4.7,
    comments: 'Sharp amazing lens' 
  }, {
    name: 'Fuji 56mm 1.2',
    lensImage: 'https://images-na.ssl-images-amazon.com/images/I/41Dpq-6fQ8L._AC_US436_FMwebp_QL65_.jpg',
    mount: 'Fuji X Mount',
    rating: 4.7,
    comments: 'Lens is slow and loud, NO GOOD!' 
  }]
}

let condense = (json) => {
  let result = [];
  for (let key in json) {
    json[key].forEach((lens)=> {
      result.push(lens);
    })
  }
  return result;
}

const Reviews = () => (
  <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Lens Image</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Mount</Table.HeaderCell>
        <Table.HeaderCell>Rating</Table.HeaderCell>
        <Table.HeaderCell>Comments</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {condense(exampleApi).map((lens, i) => {
      return  <Table.Row key={i}> 
                <Table.Cell>
                  <Header as='h2' textAlign='center'>
                  <Image src={lens.lensImage}></Image>
                  </Header>
                </Table.Cell>
                <Table.Cell singleLine>{lens.name}</Table.Cell>
                <Table.Cell>
                  {lens.mount}
                </Table.Cell>
                <Table.Cell textAlign='right'>
                  <Rating icon='star' defaultRating={lens.rating} maxRating={5} />
                  <a href='https://www.dxomark.com/'>DXO Mark Score X</a>
                </Table.Cell>
                <Table.Cell>
                  {lens.comments}
                </Table.Cell>
              </Table.Row>
      })}
    </Table.Body>
  </Table>
)

export default Reviews