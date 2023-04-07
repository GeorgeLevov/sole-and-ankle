import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
    slug,
    name,
    imageSrc,
    price,
    salePrice,
    releaseDate,
    numOfColors,
}) => {
    const variant =
        typeof salePrice === "number"
            ? "on-sale"
            : isNewShoe(releaseDate)
            ? "new-release"
            : "default";

    return (
        <Link href={`/shoe/${slug}`}>
            <Wrapper>
                <ImageWrapper>
                    <Image alt="" src={imageSrc} />
                    {variant !== "default" && (
                        <SalePrice
                            background={
                                (variant === "on-sale" && COLORS.primary) ||
                                (variant === "new-release" && COLORS.secondary)
                            }
                        >
                            {variant === "on-sale" ? "Sale" : "Just Released!"}
                        </SalePrice>
                    )}
                </ImageWrapper>
                <Spacer size={12} />
                <Row>
                    <Name>{name}</Name>
                    <Price
                        style={{
                            "--text-decoration":
                                variant === "on-sale"
                                    ? "line-through"
                                    : "unset",
                        }}
                    >
                        {formatPrice(price)}
                    </Price>
                </Row>
                <Row>
                    <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
                    {variant === "on-sale" && (
                        <Price style={{ color: COLORS.primary }}>
                            {formatPrice(salePrice)}
                        </Price>
                    )}
                </Row>
            </Wrapper>
        </Link>
    );
};

const Link = styled.a`
    text-decoration: none;
    color: inherit;
    flex: 1 1 300px;
    max-width: 630px;
`;

const Wrapper = styled.article`
    display: flex;
    flex-direction: column;
`;

const ImageWrapper = styled.div`
    position: relative;
    /* display: flex; */
`;

const Image = styled.img`
    width: 100%;
    border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
    font-size: 1rem;

    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
`;

const Name = styled.h3`
    font-weight: ${WEIGHTS.medium};
    color: ${COLORS.gray[900]};
`;

const Price = styled.span`
    text-decoration: var(--text-decoration);
    color: ${(p) => p.color};
`;

const ColorInfo = styled.p`
    color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
    font-weight: ${WEIGHTS.medium};
    background-color: ${(p) => p.background};
    color: ${COLORS.white};
    position: absolute;
    top: 12px;
    right: -8px;
    padding: 8px;
    border: none;
    border-radius: 4px;
`;

export default ShoeCard;
