/**
 * 隐藏类型
 *
 * @description ALL    全部隐藏
 *              MEDIUM 局部隐藏
 *              NONE   全部隐藏
 * @type {{ALL: string, MEDIUM: string, NONE: string}}
 */
const HideType = {
    NONE: 'none',
    MEDIUM: 'medium',
    ALL: 'all'
};

/**
 * 更新范围
 * @description ALL     更新全部
 *              TOP     更新视频数量/警力数量栏
 *              BOTTOM  更新实时警情
 * @type {{ALL: string, TOP: string, BOTTOM: string}}
 */
const UpdateScope = {
    TOP: 'top',
    BOTTOM: 'bottom',
    ALL: 'all'
};

/**
 * 更新右侧的窗口
 *
 * @param hideType    隐藏类型
 * @param updateScope 更新范围
 */
function updateTabCss(hideType = HideType.NONE, updateScope = UpdateScope.ALL) {

    const topDiv = $(".chartdivRightTop").css("right");
    const bottomDiv = $(".chartdivrightBottom").css("right");

    const topHideStatus = getHideStatus(topDiv);
    const bottomHideStatus = getHideStatus(bottomDiv);

    const options = {
        tabToggle: '',
        aTitle: '',
        topDivEle: '',
        bottomDivEle: ''
    };

    const setOptions = (tabToggle, topDivEle, aTitle, bottomDivEle, mode) => {
        if (updateScope === UpdateScope.TOP || updateScope === UpdateScope.ALL) {
            // if (topHideStatus !== mode) {
                options.topDivEle = topDivEle;
            // }
            options.tabToggle = tabToggle;
        }
        if (updateScope === UpdateScope.BOTTOM || updateScope === UpdateScope.ALL) {
            // if (bottomHideStatus !== mode) {
                options.bottomDivEle = bottomDivEle;
            // }
            options.aTitle = aTitle;
        }
    };

    switch (hideType) {
        case HideType.NONE:
            setOptions(
                "-18px",
                "31px",
                "-18px",
                "31px",
                HideType.NONE
            );
            break;
        case HideType.MEDIUM:
            setOptions(
                "-29px",
                "-375px",
                "-29px",
                "-375px",
                HideType.MEDIUM
            );
            break;
        case HideType.ALL:
            setOptions(
                "-18px",
                "-410px",
                "-18px",
                "-410px",
                HideType.ALL
            );
            break;
    }

    doUpdateCss(options.tabToggle, it => $(".tabtoggle").css("left", it));
    doUpdateCss(options.aTitle, it => $(".a_title").css("left", it));
    doUpdateCss(options.topDivEle, it => $(".chartdivRightTop").css("right", it));
    doUpdateCss(options.bottomDivEle, it => $(".chartdivrightBottom").css("right", it));

}

function doUpdateCss(value, callback) {
    value && value.length > 0 && callback(value);
}

/**
 * 获得当前的隐藏状态
 *
 * @param it 像素值
 * @returns {string}
 */
function getHideStatus(it) {
    return it === '31px' ? HideType.NONE : (it === '-375px' ? HideType.MEDIUM : HideType.ALL);
}

export {
    HideType, UpdateScope, updateTabCss
}