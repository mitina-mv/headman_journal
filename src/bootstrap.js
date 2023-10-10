import * as Font from "expo-font"
export async function bootstrap() {
    await Font.loadAsync({
        // 'name-font': require('./../assets/font/...')
    })
}