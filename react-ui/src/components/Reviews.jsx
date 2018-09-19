import React from 'react'
import { Image, Header, Table, Rating } from 'semantic-ui-react'

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
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
            <Image src='https://cdn.dxomark.com/wp-content/uploads/2017/09/Canon-EF-50mm-F1.8-STM-lens-review-Thrifty-fifty.jpg'></Image>
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>Canon EF 50mm 1.8</Table.Cell>
        <Table.Cell>
          <Rating icon='star' defaultRating={3} maxRating={3} />
        </Table.Cell>
        <Table.Cell textAlign='right'>
          80% <br />
          <a href='https://www.borrowlenses.com/'>Borrow Lenses</a>
        </Table.Cell>
        <Table.Cell>
          Great Lens!  Super fast and sharp, Highly recommend!
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>
          <Image src='https://cdn.dxomark.com/wp-content/uploads/2017/09/Sigma-30mm-f-1.4-DC-DN-C-lens-review-Sony-E-top-ranking-prime.jpg'></Image>
          </Header>
        </Table.Cell>
        <Table.Cell singleLine>Sigma 30mm 1.4</Table.Cell>
        <Table.Cell>
          <Rating icon='star' defaultRating={3} maxRating={3} />
        </Table.Cell>
        <Table.Cell textAlign='right'>
          100% <br />
          <a href='https://www.dxomark.com/'>DXO Mark</a>
        </Table.Cell>
        <Table.Cell>
          Lens is slow and loud, NO GOOD!
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default Reviews