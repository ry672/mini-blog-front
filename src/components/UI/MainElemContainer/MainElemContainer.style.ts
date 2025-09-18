import styled from "styled-components";

export const SMainElemContainer = styled.div`
.List {
  box-shadow: 0 0 10px var(--light-gray);
  background-color: var(--elems-bgc);
  border-radius: 20px;
  padding: calc(1vw + 11px);

  &__title {
    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .count {
      color: var(--dark-gray);
      font-weight: 400;
    }
  }
}
.MusicBlock {
  box-shadow: 0 0 10px var(--light-gray);
  background-color: var(--elems-bgc);
  padding: calc(1vw + 11px);
  border-radius: 20px;

  &__title {
    margin-bottom: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: var(--prime-color);
      font-weight: 400;
    }
  }

  .MusicElem {
    cursor: pointer;
    position: relative;
    list-style: none;

    display: flex;
    align-items: center;
    gap: 15px;

    padding: 15px;
    border-radius: 15px;

    transition: 200ms;

    &:hover {
      background-color: var(--light-gray);
    }

    img {
      flex: 0 0 70px;
      height: 70px;
      width: 70px;
      border-radius: 5px;
      object-fit: cover;
    }

    .music__description {
      flex: 1 1 auto;

      .main__text {
        margin-bottom: 5px;
        display: inline-block;
      }
    }

    .secondary__text {
      font-size: calc(0.4vw + 8px); //? 14 - 1440 | 16 - 1920
      font-weight: 300;
    }

    .plus-button {
      flex: 0 0 24px;
      height: 24px;

      border: 2px solid var(--prime-color);
      border-radius: 50%;

      position: relative;

      &::before {
        content: "";
        border-radius: 5px;
        height: 2px;
        width: 70%;
        background-color: var(--prime-color);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 200ms;
      }

      &::after {
        content: "";
        border-radius: 5px;
        width: 2px;
        height: 70%;
        background-color: var(--prime-color);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 200ms;
      }

      &._active {
        &::after {
          transform: translate(-50%, -50%) rotate(90deg);
        }
      }
    }
  }
}
.UserElem {
  cursor: pointer;
  position: relative;
  list-style: none;

  display: flex;
  align-items: center;
  gap: 15px;

  padding: 15px;
  border-radius: 15px;

  transition: 200ms;

  &:hover {
    background-color: var(--light-gray);
  }

  &:active {
    transition: 100ms;
    background-color: var(--prime-color);
    p {
      color: white;
    }

    .Badge {
      background-color: white;
      color: var(--text-color);
    }
  }

  &:not(:last-child) {
    margin-bottom: 15px;

    &::after {
      content: "";
      height: 1px;
      width: 80%;
      background-color: var(--light-gray);

      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  img {
    flex: 0 0 60px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user__description {
    flex: 1 1 auto;

    .main__text {
      margin-bottom: 5px;
      display: inline-block;
    }
  }

  .secondary__text {
    font-size: calc(0.4vw + 8px); //? 14 - 1440 | 16 - 1920
    font-weight: 300;

    &._online {
      color: var(--green);
    }
  }
}
`