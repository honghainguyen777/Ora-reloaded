import React, { useState, useEffect } from "react";
import "./GallerySale.css";
import { fetchArtworks, sendOffer } from "../../api/service";

const GalleryOffer = (props) => {
  const [artworks, setArtworks] = useState([]);
  const [isViewInventory, setIsViewInventory] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const resArtworks = await fetchArtworks();
      setArtworks(resArtworks);
      setSearchResults(resArtworks);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!artworks.length) return;
    let regex = new RegExp(query, "i");
    const matchedArtworks = artworks.filter((artwork) => {
      return (
        artwork.title.match(regex) ||
        mediumFilter(artwork.medium, regex) ||
        artwork.artist.name.match(regex)
      );
    });
    setSearchResults(matchedArtworks);
  }, [query]);

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = async () => {
    const reqData = {
      artwork: selectedArtwork._id,
      message,
      request: props.request._id,
      collector: props.collector.id,
    };
    const response = await sendOffer(reqData);
    if (response.success) {
      return props.updateSalesItems(response.data);
    }
    return;
  };

  const mediumFilter = (list, regex) => {
    for (let el of list) {
      if (el.match(regex)) return true;
    }
    return false;
  };

  const searchHandler = (event) => {
    const typedQuery = event.target.value;
    if (typedQuery === "") {
      setSearchResults(artworks);
    }
    setQuery(typedQuery);
  };

  const myInventory = !isViewInventory ? null : (
    <>
      <div className="offer-my-inventory">
        <div className="offer-my-inventory-container">
          <div className="offer-inventory-header">
            <span>MY INVENTORY</span>
            <div>
              Unique artworks / Edition and multiples / Products / Artist books
              & Publications
            </div>
          </div>
          <input
            type="text"
            placeholder="SEARCH BAR"
            name="query"
            value={query}
            onChange={searchHandler}
          />
          <div className="offer-results">
            {searchResults.length
              ? searchResults.map((artwork, index) => {
                  return (
                    <div key={index} className="offer-results-item">
                      <div>
                        <img
                          className="offer-item-img"
                          src={artwork.imageUrl}
                          alt={artwork.imgPublicId}
                        />
                        <div>
                          <div className="offer-artist-name">
                            {artwork.artist.name}
                          </div>
                          <div>
                            Title & Year: {artwork.title}{" "}
                            {artwork.realisationYear}
                          </div>
                          <div>Signed: {artwork.signed ? "Yes" : "No"}</div>
                          <div>Material: {artwork.materialsAndTechnique}</div>
                          <div>
                            Dimension:{" "}
                            {`${artwork.height}mm x ${artwork.width}mm x ${artwork.length}mm`}
                          </div>
                          <div>Stock number: {artwork.stockNumber}</div>
                          <div>Price: {artwork.price}</div>
                          <div>Location: {artwork.location}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => (
                          setSelectedArtwork(artwork), setIsViewInventory(false)
                        )}
                      >
                        ADD TO OFFER
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
          <button onClick={() => setIsViewInventory(false)}>
            BACK TO REQUESTS
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {isViewInventory ? myInventory : null}
      <div className="offer-container">
        <button
          className="offer-select-inventory"
          onClick={() => setIsViewInventory(true)}
        >
          {selectedArtwork
            ? `Selected: "${selectedArtwork.title}" from "${selectedArtwork.artist.name}" - Click to change`
            : "SELECT FROM INVENTORY +"}
        </button>
        <div className="offer-message-container">
          <div>LEAVE A MESSAGE</div>
          <div className="offer-message">
            <textarea
              name="message"
              id=""
              rows="7"
              value={message}
              onChange={onChange}
            ></textarea>
          </div>
        </div>
        <button className="gallery-send-offer" onClick={submitHandler}>
          SEND THE OFFER
        </button>
      </div>
    </>
  );
};

export default GalleryOffer;
