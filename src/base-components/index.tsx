import { currentEnv } from "../utils";
import React from "react";

export const Button = (props) => {
  if (currentEnv === 'wx_mp') {
    return <wx-button {...props} />;
  }
  return <button {...props} />;
};

export const CoverImage = (props) => {
  if (currentEnv === 'wx_mp') {
    return <wx-cover-image {...props} />;
  }
  return <img {...props} />;
};

export const Image = (props) => {
  if (currentEnv === 'wx_mp') {
    return <wx-image {...props} />;
  }
  return <img {...props} />;
};

export const CoverView = (props) => {
  if (currentEnv === 'wx_mp') {
    return <wx-cover-view {...props} />;
  }
  return <div {...props} />;
};

export const MatchMedia = (props) => {
  if (currentEnv === 'wx_mp') {
    return <wx-match-media {...props} />;
  }
  return null;
};

export const MovableArea = (props) => {
  if (currentEnv === 'wx_mp') {
    return <wx-movable-area {...props} />
  }
  return null;
};

export const MovableView = (props) => {
  if (currentEnv === 'wx_mp') {
    return <wx-movable-view {...props} />;
  }
  return <div {...props} />;
};

export const ScrollView = (props) => {
  if (currentEnv === 'wx_mp') {
    return <wx-scroll-view {...props} />;
  }
  return <div {...props} />;
}



