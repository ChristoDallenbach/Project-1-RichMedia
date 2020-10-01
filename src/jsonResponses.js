const listings = {};

const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.end();
};

const getListings = (request, response) => {
  const responseJSON = {
    listings,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getListingsMeta = (request, response) => respondJSONMeta(request, response, 200);

const updateListing = (request, response) => {
  const newListing = {
    createdAt: Date.now(),
  };

  listings[newListing.createdAt] = newListing;

  return respondJSON(request, response, 201, newListing);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found!',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

const addListing = (request, response, body) => {
  const responseJSON = {
    message: 'Listing name, price, and user info are all required',
  };

    console.log(body.name);
    console.log(body.price);
    console.log(body.email);
    
  if (!body.name || !body.price || !body.email) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;
  if (listings[body.name]) {
    responseCode = 204;
  } else {
    listings[body.name] = {};
  }

  listings[body.name].name = body.name;
  listings[body.name].price = body.price;
  listings[body.name].email = body.email;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

module.exports = {
  getListings,
  getListingsMeta,
  updateListing,
  notFound,
  notFoundMeta,
  addListing,
};
