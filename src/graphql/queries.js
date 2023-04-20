/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getForSale = /* GraphQL */ `
  query GetForSale($id: ID!) {
    getForSale(id: $id) {
      type
      title
      description
      image
      price
      date
      time
      phone_number
      location
      user
      id
      createdAt
      updatedAt
    }
  }
`;
export const listForSales = /* GraphQL */ `
  query ListForSales(
    $filter: ModelForSaleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForSales(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        title
        description
        image
        price
        date
        time
        phone_number
        location
        user
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHousing = /* GraphQL */ `
  query GetHousing($id: ID!) {
    getHousing(id: $id) {
      type
      title
      description
      image
      price
      date
      time
      phone_number
      location
      user
      id
      createdAt
      updatedAt
    }
  }
`;
export const listHousings = /* GraphQL */ `
  query ListHousings(
    $filter: ModelHousingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHousings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        title
        description
        image
        price
        date
        time
        phone_number
        location
        user
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getServices = /* GraphQL */ `
  query GetServices($id: ID!) {
    getServices(id: $id) {
      type
      title
      description
      image
      date
      time
      phone_number
      location
      user
      id
      createdAt
      updatedAt
    }
  }
`;
export const listServices = /* GraphQL */ `
  query ListServices(
    $filter: ModelServicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        title
        description
        image
        date
        time
        phone_number
        location
        user
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getJobs = /* GraphQL */ `
  query GetJobs($id: ID!) {
    getJobs(id: $id) {
      type
      title
      description
      image
      pay
      date
      time
      phone_number
      location
      user
      id
      createdAt
      updatedAt
    }
  }
`;
export const listJobs = /* GraphQL */ `
  query ListJobs(
    $filter: ModelJobsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        title
        description
        image
        pay
        date
        time
        phone_number
        location
        user
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommunity = /* GraphQL */ `
  query GetCommunity($id: ID!) {
    getCommunity(id: $id) {
      type
      title
      description
      image
      date
      time
      phone_number
      location
      user
      id
      createdAt
      updatedAt
    }
  }
`;
export const listCommunities = /* GraphQL */ `
  query ListCommunities(
    $filter: ModelCommunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommunities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        title
        description
        image
        date
        time
        phone_number
        location
        user
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
