import * as path from 'path';

export const hbsRegisterHelpers = (hbs) => {

    let blocks = {};

    hbs.registerPartials(path.resolve(__dirname, '..', 'views', 'parts'))

    hbs.registerHelper('content', function(name, context) {
        let block = blocks[name];
        if (!block) {
            block = blocks[name] = [];
        }
        
        block.push(context.fn(this));
        
    });

    hbs.registerHelper('block', function(name, context) {
        let val = (blocks[name] || []).join('\n');
    
        blocks[name] = [];
        return val;
    });

    hbs.registerHelper("img", function(name, options) {
        
        return new hbs.SafeString(`<img src=http://localhost:5000/${name}>`);
    });

    
}

