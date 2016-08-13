# enchantjs-typescript
TypeScriptでenchant.jsを簡易的に使えるようにするライブラリの改良版

# ライブラリの利用方法
スターターキットをご利用ください。  
[最新リリース版(starter.zip)](https://github.com/kazenetu/enchantjs-typescript/releases/latest)

## ライブラリのAPIドキュメント
スターターキットの[docフォルダ](http://kazenetu.github.io/enchantjs-typescript/starter/doc/)をご覧ください。

# ライブラリのビルド方法
npm installした上で、下記を実行してください。  
   * ```npm run build ``` (または ```gulp ```) ライブラリと実装例をビルドします。
   * ```gulp buildBases``` ライブラリをビルドします。
   * ```gulp buildExamples``` 実装例をビルドします。

# enchant.jsとets-framework.d.tsの比較
|enchant.jsのクラス名|ets-framework.d.ts|備考|
|:---------|:---------|:---------|
|なし |Rf.ETS.FrameWork.GameMain |ライブラリのエントリークラスです |
|enchant.Group |Rf.ETS.FrameWork.Group | |
|enchant.Label |Rf.ETS.FrameWork.Label | |
|enchant.Sprite |Rf.ETS.FrameWork.NoImageSprite |イメージなしバージョンです |
|enchant.Sprite |Rf.ETS.FrameWork.Sprite | FileName(value:string)でassets名を指定することでイメージを設定できます |
|enchant.Map |Rf.ETS.FrameWork.Map |FileName(value:string)でassets名を指定することでイメージを設定できます<br>LoadDataメソッドでマップデータ※を読み込みます |
|enchant.extendMap.ExMap |Rf.ETS.FrameWork.ExMap |FileName(value:string)でassets名を指定することでイメージを設定できます<br>LoadDataメソッドでマップデータ※を読み込みます |

※Mapデータは[enchantMapEditor](https://github.com/wise9/enchantMapEditor)で作成したデータを利用します。  
　「マップ拡張を有効にする」にチェックを入れて作成したマップはRf.ETS.FrameWork.ExMapを使用してください。  

# License
MIT license.
