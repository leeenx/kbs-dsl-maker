import React, { memo, useState} from "react";
import { useMemoizedFn } from "ahooks";
import { Button } from "../../base-components";

// css
import css from './index.css';
import { currentEnv } from "../../utils";

// #话题 与 @朋友 的位置参数
const BUTTON_Y = 120 + 44 + 24;
const TOPIC_BUTTON_X = 24;
const FRIEND_BUTTON_X = 100 + 24 + 12;
const BUTTON_WIDTH = 100;
const BUTTON_HEIGHT = 40;
const LIST_Y = BUTTON_Y + BUTTON_HEIGHT + 10;
const LIST_ITEM_HEIGHT = 40;

export default memo(() => {

  const [value, setValue] = useState('');
  const [currentType, setCurrentType] = useState('');

  const topicList = [
    '青春就要满蕴精萃',
    '选车必须好开',
    '一键变真人手办'
  ];

  const friendList = ['朋友1', '朋友2', '朋友3'];

  const handleChange = useMemoizedFn((e) => {
    console.log('---- onInput', e?.nativeEvent, e?.nativeEvent?.detail?.value);
    setValue(currentEnv === 'wx_mp' ? e?.nativeEvent?.detail?.value : e?.target?.value);
  });

  const handleClick = useMemoizedFn((e) => {
    const { pageX, pageY } = e;
    const { x = pageX, y = pageY } = e.nativeEvent.detail;
    console.log({ x, y });
    if (y >= BUTTON_Y && y <= BUTTON_Y + BUTTON_HEIGHT) {
      // 擦作按钮
      if (x >= TOPIC_BUTTON_X && x <= TOPIC_BUTTON_X + BUTTON_WIDTH) {
        // 选中话题
        handleTopicClick();
        setValue(`${value} #`);
      } else if (x >= FRIEND_BUTTON_X && x <= FRIEND_BUTTON_X + BUTTON_WIDTH) {
        // 选中朋友
        handleFriendClick();
        setValue(`${value} @`);
      }
    } else if (y >= LIST_Y && x >= 24 && currentType) {
      const index = Math.round((y - LIST_Y) / LIST_ITEM_HEIGHT) - 1;
      if (index >= 0) {
        const itemValue = currentType === 'topic' ? topicList[index] : friendList[index];
        setValue(`${value}${itemValue}`);
        setCurrentType('');
      }
    }
  });

  const handleTopicClick = useMemoizedFn(() => {
    // 点中 #主题
    setCurrentType('topic');
  });

  const handleFriendClick = useMemoizedFn(() => {
    // 点中 @朋友
    setCurrentType('friend');
  });

  return (
    <div style={css.main} onClick={handleClick}>
      <textarea style={css.textarea} onInput={handleChange} value={value}></textarea>
      <div style={css.header}>
        <div style={css.done}>完成</div>
        <Button style={css.button} type="warn">发布</Button>
      </div>
      <div style={css.operation}>
        <Button style={css.operaBtn}>#话题</Button>
        <Button style={css.operaBtn}>@朋友</Button>
      </div>
      {
        currentType === 'topic' && (
          <div style={css.list}>
            {
              topicList.map(item => (<div style={css.item} key={item}># {item}</div>))
            }
          </div>
        )
      }
      {
        currentType === 'friend' && (
          <div style={css.list}>
            {
              friendList.map(item => (<div style={css.item} key={item}>@ {item}</div>))
            }
          </div>
        )
      }
    </div>
  );
});
