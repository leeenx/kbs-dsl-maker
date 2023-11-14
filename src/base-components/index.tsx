import { currentEnv } from "../utils";
import React from "react";

export const Button = (props) => {
  if (currentEnv === 'wechat-miniprogram') {
    return <wx-button {...props} />;
  }
  return <button {...props} />;
};

export const CoverImage = (props) => {
  if (currentEnv === 'wechat-miniprogram') {
    return <wx-cover-image {...props} />;
  }
  return <img {...props} />;
};

export const Image = (props) => {
  if (currentEnv === 'wechat-miniprogram') {
    return <wx-image {...props} />;
  }
  return <img {...props} />;
};

export const CoverView = (props) => {
  if (currentEnv === 'wechat-miniprogram') {
    return <wx-cover-view {...props} />;
  }
  return <div {...props} />;
};

export const MatchMedia = (props) => {
  if (currentEnv === 'wechat-miniprogram') {
    return <wx-match-media {...props} />;
  }
  return null;
};

export const MovableArea = (props) => {
  if (currentEnv === 'wechat-miniprogram') {
    return <wx-movable-area {...props} />
  }
  return null;
};

export const MovableView = (props) => {
  if (currentEnv === 'wechat-miniprogram') {
    return <wx-movable-view {...props} />;
  }
  return <div {...props} />;
};

export const ScrollView = (props) => {
  if (currentEnv === 'wechat-miniprogram') {
    return <wx-scroll-view {...props} />;
  }
  return <div {...props} />;
}



