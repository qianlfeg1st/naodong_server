import { Controller } from 'egg'

class Works extends Controller {

  // 静默登陆
  async add () {

    const { ctx } = this

    // console.log('~~~~~~~~~~~', ctx.model.AnimeWorks)
    // const { body } = ctx.request

    const works = await ctx.model.AnimeWorks({
      chinese_name: '进击的巨人 第四季',
      english_name: 'Attack on Titan',
      orgin_name: '進撃の巨人',
    })

    await works.save()

    // console.log('~~res~~', res)

    ctx.body = {
      status: true,
    }
  }

}

export default Works
