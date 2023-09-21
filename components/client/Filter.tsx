"use client";

import { useState, useEffect, useRef } from "react";
import { GrFormClose } from "react-icons/gr";

const Filter = ({
  selectedFilters,
  selectedSizes,
  setSelectedFilters,
  setSelectedSizes,
}: {
  selectedFilters: any[];
  selectedSizes: any[];
  setSelectedFilters: Function;
  setSelectedSizes: Function;
}) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  // const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  // const [selectedSizes, setSelectedSizes] = useState<any[]>([]);

  const filterButtonRef = useRef<any>(null);
  const filterDropdownRef = useRef<any>(null);
  const filterSelectedRef = useRef<any>(null);

  const handleFilterOpen = () => {
    setFilterOpen((s) => !s);
  };

  const handleFilterClick = (filter: any) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(
        selectedFilters.filter((selectedFilter) => selectedFilter !== filter)
      );
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  const handleSizeClick = (size: any) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(
        selectedSizes.filter((selectedSize) => selectedSize !== size)
      );
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const target: any = event.target;

      if (
        filterButtonRef.current.contains(target) &&
        filterDropdownRef.current.contains(target) &&
        filterSelectedRef.current.contains(target) &&
        target?.classList.contains("close-button") &&
        target?.classList.contains("size") &&
        target?.classList.contains("selected") &&
        filterOpen // Add this condition to check if the filter is open
      ) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [filterOpen]); // Add filterOpen as a dependency to useEffect

  return (
    <div className="filters-main">
      {filterOpen && (
        <div
          className="close-container"
          onClick={() => {
            setFilterOpen(false);
          }}
        />
      )}
      <div
        className="filters-container"
        onBlur={() => {
          setFilterOpen(false);
          console.log("BC");
        }}
      >
        <div
          className="filters-button"
          onClick={handleFilterOpen}
          ref={filterButtonRef}
        >
          <p>Filters</p>
          <div className={`filters-open-close ${filterOpen ? "rotate" : ""}`}>
            +
          </div>
        </div>
        <div className="filters-selected" ref={filterSelectedRef}>
          {selectedFilters.map((filter) => (
            <div key={filter} className="selected-filter">
              <p>{filter}</p>
              <button
                className="close-button"
                onClick={() => {
                  handleFilterClick(filter);
                }}
              >
                <GrFormClose size="10px" />
              </button>
            </div>
          ))}
          {selectedSizes.map((size) => (
            <div key={size} className="selected-size">
              <p>{size}</p>
              <button
                className="close-button"
                onClick={() => {
                  handleSizeClick(size);
                }}
              >
                <GrFormClose size="10px" />
              </button>
            </div>
          ))}
        </div>
        <div
          className={`filters-dropdown ${filterOpen ? "filter-Open" : ""}`}
          ref={filterDropdownRef}
        >
          <div className="filter" onClick={() => handleFilterClick("Solid")}>
            <p>Solid</p>
            <div
              className={`selected ${
                selectedFilters.includes("Solid") ? "active" : ""
              }`}
            >
              {selectedFilters.includes("Solid") ? "-" : "+"}
            </div>
          </div>
          <div className="filter" onClick={() => handleFilterClick("Stripes")}>
            <p>Stripes</p>
            <div
              className={`selected ${
                selectedFilters.includes("Stripes") ? "active" : ""
              }`}
            >
              {selectedFilters.includes("Stripes") ? "-" : "+"}
            </div>
          </div>
          <div className="filter" onClick={() => handleFilterClick("Printed")}>
            <p>Printed</p>
            <div
              className={`selected ${
                selectedFilters.includes("Printed") ? "active" : ""
              }`}
            >
              {selectedFilters.includes("Printed") ? "-" : "+"}
            </div>
          </div>
          <div className="sizes">
            <div
              className="size-container"
              onClick={() => handleSizeClick("S")}
            >
              <div
                className={`size ${
                  selectedSizes.includes("S") ? "active" : ""
                }`}
              >
                S
              </div>
              <div className="selected">
                {selectedSizes.includes("S") ? "-" : "+"}
              </div>
            </div>
            <div
              className="size-container"
              onClick={() => handleSizeClick("M")}
            >
              <div
                className={`size ${
                  selectedSizes.includes("M") ? "active" : ""
                }`}
              >
                M
              </div>
              <div className="selected">
                {selectedSizes.includes("M") ? "-" : "+"}
              </div>
            </div>
            <div
              className="size-container"
              onClick={() => handleSizeClick("L")}
            >
              <div
                className={`size ${
                  selectedSizes.includes("L") ? "active" : ""
                }`}
              >
                L
              </div>
              <div className="selected">
                {selectedSizes.includes("L") ? "-" : "+"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
