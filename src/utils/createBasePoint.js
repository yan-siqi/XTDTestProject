//通过自定义图元的方式创建特效点位共3部分，底图、圆柱和柱子特效

/**
 * @param {*} x
 * @param {*} y
 * @param {*} scaleNum
 * @param {*} names   //图元属性
 * @param {*} allowPick   //是否允许点击
 */
export function createBasePoint(x, y, scaleNum, names, allowPick) {
  // console.log(x, y,scaleNum,names,allowPick);
  // x = names.Longitude;
  // y = names.Latitude;

  scaleNum = scaleNum / 3;
  const position = [(x * Math.PI) / 180, (y * Math.PI) / 180, 0];
  const color = [1, 0.0002, 0.001, 2];
  const p2 = new XE.Obj.CustomPrimitive(earth);
  const p3 = new XE.Obj.CustomPrimitive(earth);
  const p4 = new XE.Obj.CustomPrimitive(earth);
  //底面
  {
    const evalString = `
                Cesium.Resource.createIfNeeded('/img/circular_03.png').fetchImage().then(function(image) {
                    p.canvasWidth = 512;
                    p.canvasHeight = 512;

                    p.drawCanvas(ctx => {
                        ctx.clearRect(0, 0, 512, 512);
                        ctx.beginPath();
                        ctx.strokeStyle = "rgb(255, 255, 255)";
                        ctx.lineWidth = 1;
                        ctx.arc(256, 256, 250, 0, Math.PI*2, true);
                        ctx.stroke();
                        ctx.drawImage(image, 0, 0);
                    });

                    p.color = [1, 0.1, 0.1, 2];
                });
            `;

    const preUpdateEvalString = `
                if (typeof p.xxxAngle === 'undefined') p.xxxAngle = 360.0;
                p.xxxAngle -= 1.0;
                if (p.xxxAngle < 0) {
                    p.xxxAngle = 360.0;
                }
                p.rotation[0] = p.xxxAngle /180.0 * Math.PI;
            `;

    const config = {
      evalString,
      preUpdateEvalString,
      position: [...position],
      scale: [scaleNum / 8, scaleNum / 8, 300],
      positions: [...XE.Obj.CustomPrimitive.Geometry.unitSquare.positions],
      sts: [...XE.Obj.CustomPrimitive.Geometry.unitSquare.sts],
      indices: [...XE.Obj.CustomPrimitive.Geometry.unitSquare.indices],
      renderState: XE.Obj.CustomPrimitive.getRenderState(true, true),
      color: [...color],
      canvasWidth: 512,
      canvasHeight: 512,
      _value: names
    };

    p2.xbsjFromJSON(config);
  }

  // 柱体
  {
    const fragmentShaderSource = `
        varying vec3 v_positionEC;
        varying vec3 v_normalEC;
        varying vec2 v_st;
        varying vec4 v_color;
        uniform sampler2D u_image;
        uniform vec4 u_color;
        void main()
        {
            float powerRatio = fract(czm_frameNumber / 30.0) + 1.0;
            float alpha = pow(1.0 - v_st.t, powerRatio);
            gl_FragColor = vec4(u_color.rgb, alpha*u_color.a);
        }
        `;
    const renderState = XE.Obj.CustomPrimitive.getRenderState(true, true);
    renderState.cull.enabled = false;
    const cylinder = XE.Obj.CustomPrimitive.Geometry.createCylinder(
      0.05,
      0.3,
      0.7,
      100
    );
    const config = {
      position: [...position],
      scale: [(2 / 25) * scaleNum, (2 / 25) * scaleNum, scaleNum],
      positions: cylinder.positions,
      sts: cylinder.sts,
      indices: cylinder.indices,
      renderState,
      color: [...color],
      canvasWidth: 1,
      allowPicking: allowPick,
      _value: names,
      fragmentShaderSource
    };
    p3.xbsjFromJSON(config);
  }

  // 柱体粒子
  {
    const fragmentShaderSource = `
        varying vec3 v_positionEC;
        varying vec3 v_normalEC;
        varying vec2 v_st;
        varying vec4 v_color;
        uniform sampler2D u_image;
        uniform vec4 u_color;
        void main()
        {
            vec3 positionToEyeEC = -v_positionEC;
            vec3 normalEC = normalize(v_normalEC);
            normalEC = faceforward(normalEC, vec3(0.0, 0.0, 1.0), -normalEC);
            float dt = fract(czm_frameNumber / 90.0);
            vec2 st = fract(vec2(1.0) + v_st - vec2(dt, dt));
            vec4 imageColor = texture2D(u_image, st);
            vec3 diffuse = imageColor.rgb;
            float alpha = imageColor.a;
            diffuse *= v_color.rgb;
            alpha *= v_color.a;
            diffuse *= u_color.rgb;
            alpha *= u_color.a;
            gl_FragColor = vec4(diffuse, alpha * pow(1.0 - v_st.t, 2.0));
        }
        `;
    const evalString = `
            p.canvasWidth = 32;
            p.canvasHeight = 256;
            Cesium.Resource.createIfNeeded('/img/particles.png').fetchImage().then(function(image) {
                p.drawCanvas(ctx => {
                    ctx.clearRect(0, 0, 32, 256);
                    ctx.drawImage(image, 0, 0);
                });
            });
        `;
    const renderState = XE.Obj.CustomPrimitive.getRenderState(true, true);
    renderState.cull.enabled = false;
    const cylinder = XE.Obj.CustomPrimitive.Geometry.createCylinder(
      4.0,
      4.0,
      1.0,
      100
    );
    const config = {
      evalString,
      fragmentShaderSource,
      position: [...position],
      scale: [(3 / 320) * scaleNum, (3 / 320) * scaleNum, scaleNum],
      positions: cylinder.positions,
      sts: cylinder.sts,
      indices: cylinder.indices,
      color: [...color],
      canvasWidth: 32,
      canvasHeight: 256,
      renderState,
      allowPicking: allowPick,
      _value: names
    };
    p4.xbsjFromJSON(config);
  }
  return [p2, p3, p4];
}
